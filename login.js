const $login=id=>document.getElementById(id);

async function digestLoginPin(pin){
  if(!crypto.subtle)throw new Error('Secure PIN hashing is unavailable. Open this app on localhost or HTTPS.');
  const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(pin));
  return Array.from(new Uint8Array(bytes),byte=>byte.toString(16).padStart(2,'0')).join('');
}

async function verifyLoginPin(pin,confirmation){
  if(!/^\d{4,12}$/.test(pin))throw new Error('Enter a PIN containing 4 to 12 digits.');
  const stored=localStorage.getItem(PIN_KEY);
  const digest=await digestLoginPin(pin);
  if(stored){
    if(digest!==stored)throw new Error('Incorrect PIN. Try again.');
    return;
  }
  if(pin!==confirmation)throw new Error('The PIN entries do not match.');
  localStorage.setItem(PIN_KEY,digest);
}

function updateLoginForm(){
  const error=$login('loginError');
  try{
    const hasPin=Boolean(localStorage.getItem(PIN_KEY));
    $login('loginMessage').textContent=hasPin
      ?'Enter your admin PIN to open the member management app.'
      :'Create an admin PIN for this browser to continue.';
    $login('loginConfirmField').hidden=hasPin;
    $login('loginSubmit').textContent=hasPin?'Sign in':'Set PIN and continue';
    error.hidden=true;
  }catch(e){
    error.textContent='Could not access browser storage: '+e.message;
    error.hidden=false;
  }
}

updateLoginForm();
$login('loginPin').focus();
$login('loginForm').onsubmit=async event=>{
  event.preventDefault();
  const error=$login('loginError');
  error.hidden=true;
  try{
    await verifyLoginPin($login('loginPin').value,$login('loginConfirmPin').value);
    sessionStorage.setItem(APP_SESSION_KEY,'1');
    location.replace('gym-members.html');
  }catch(e){
    error.textContent='Could not sign in: '+e.message;
    error.hidden=false;
    $login('loginPin').focus();
  }
};
