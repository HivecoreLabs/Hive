# Quickstart Guide: Setting Up Google Sheets API for a Desktop Application

This guide will walk you through the process of creating a Google Developer Project, enabling the Google Sheets API, and configuring OAuth consent for your desktop application.

## Step 1: Create a Google Cloud Project

1. Visit the [Google Cloud Console](https://console.cloud.google.com/).

2. Click **Select a Project** at the top of the page, and then click **New Project**.

3. Enter a name for your project and click **Create**.

4. Once your project is created, it will be selected. Click **Open** to navigate to the project dashboard.

## Step 2: Enable the Google Sheets API

1. In the Google Cloud Console, click on the **Menu** and navigate to **APIs & Services**.

2. Click **+ ENABLE APIS AND SERVICES** at the top of the page.

3. Search for "Google Sheets API" in the search bar, and click on it.

4. Click **Enable** to enable the API for your project.

## Step 3: Configure OAuth Consent Screen

1. In the Google Cloud Console, go to **Menu > APIs & Services > OAuth consent screen**.

2. Select the user type for your app and click **Create**.

3. Complete the app registration form, then click **Save and Continue**.

   Note: You can skip adding scopes for now. In the future, you may need to add and verify authorization scopes for your app.

4. If you selected the user type as "External," you can add test users:

   - Under **Test users**, click **Add users**.
   - Enter your email address and any other authorized test users, then click **Save and Continue**.
   - You **MUST** add your own email to access this.

5. Review your app registration summary. To make changes, click **Edit**. If everything looks good, click **Back to Dashboard**.

## Step 4: Authorize Credentials for a Desktop Application

To authenticate as an end user and access user data in your app, you need to create OAuth 2.0 Client IDs. Each client ID is used to identify your app to Google's OAuth servers.

1. In the Google Cloud Console, go to **Menu > APIs & Services > Credentials**.

2. Click **Create Credentials > OAuth client ID**.

3. Select **Application type > Desktop app**.

4. In the **Name** field, provide a name for the credential (for your reference ex: **"Taylor PC"**).

5. Click **Create**. The OAuth client created screen will show your new Client ID and Client secret.

6. Click **OK**. The newly created credential appears under OAuth 2.0 Client IDs.

7. Save the downloaded JSON file as `credentials.json`.

8. Move the `credentials.json` file to your `../backend/backend/` directory.

Now you have successfully created a Google Cloud Project, enabled the Google Sheets API, configured OAuth consent, and authorized credentials for your desktop application. You can proceed to use these credentials to access the Google Sheets API.
