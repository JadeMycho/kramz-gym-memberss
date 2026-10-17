# Kramz Gym Members

A browser-based gym membership tracker with QR check-in, payment history, and revenue reports.

Open the [published app](https://jademycho.github.io/kramz-gym-memberss/) to use the latest deployed version.

When recording a payment, choose **Renew now** or **Pay in advance**. The renewal start date is selectable and defaults to today if the membership has expired, or the day after its current expiry if it is still active. Advance payment lets you choose a future start date. The due date updates automatically based on the selected start date and plan, and the app keeps renewals distinct from advance payments.

Future-dated memberships are shown under **Advanced payment**, with the number of days until their start date. Remaining days are counted from the membership start date, not from the date the payment was recorded.

Member payment history shows the selected renewal start date. The Revenue report shows when each payment was recorded.

## Run locally

Open `login.html` with the VS Code Live Server extension, or serve this folder from any local web server. Use `localhost` or HTTPS for camera access.

## Data and privacy

Open `login.html` to sign in on a separate page. The first time, create an admin PIN; later sign-ins use that same browser-local PIN used for the Revenue report. Successful sign-in opens `gym-members.html`; signing out returns to the login page. This is a client-side privacy gate only and is not secure authentication.

Member and sales data are stored in IndexedDB in the current browser and are not synchronized between devices. Use **Download backup** to export members and sales, and **Restore backup** to import them on another device.
Use **Clear all data** inside the Revenue window to permanently remove all members and payment/revenue history from the current browser. This requires the owner revenue PIN, a separate maker PIN, and a final deletion confirmation. The maker PIN is set on the first clear attempt and stored as a browser-local hash. This is only a basic client-side privacy gate, not secure authorization.

The Revenue PIN is a browser-local privacy gate, not secure authentication. Do not use this app's public GitHub Pages deployment to store real member information; anyone can access the public app, and client-side PIN checks are not server security.
