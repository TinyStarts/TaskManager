# TinyStarts

A small ADHD planner. The site is the repository root on GitHub Pages.

## Username accounts

The sign-in page asks for a username and a password. Supabase still stores an email address, so the app turns the username into one address:

`<username>@users.tinystarts.app`

That address is only used inside the sign-in request. It is not shown on the page. You do not need to own `users.tinystarts.app`, and these accounts do not use email confirmation. Leave **Allow new users to sign up** off. Create each account yourself.

### Create a username account

1. Open the Supabase dashboard for this project.
2. Go to **Authentication → Users → Add user → Create new user**.
3. Email: the username, in lowercase, plus `@users.tinystarts.app`. Example: `lifeadmin@users.tinystarts.app`.
4. Set a password.
5. Check **Auto Confirm User**.
6. Create the user.

The person then signs in with the username (`lifeadmin`) and that password.

Create the Life Admin bot account the same way. The bot still types into `#authEmail` (the username field), `#authPassword`, and `#authSubmitBtn`.

Usernames are 3–32 characters: letters, numbers, dots, underscores, and hyphens. The app trims spaces and lowercases the name before sign-in.

### Keep an existing email account

An existing account can still sign in by typing the full email address, because anything with `@` is sent as-is.

To switch that account to a username, open **Authentication → Users**, select the user, and change the email to `<username>@users.tinystarts.app`. Check that the user stays confirmed. After that, sign in with the username.
