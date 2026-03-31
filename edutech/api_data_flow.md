# EduTech API Data Flow Analysis

## Architecture Overview

```
React Component → Redux Dispatch → Service Function (authAPI/SettingsAPI) → apiConnector (Axios) → Express Route → Middleware (auth) → Controller → MongoDB → Response → Redux Store + LocalStorage
```

---

## 🔐 Auth Flows

### 1. Signup Flow

```mermaid
sequenceDiagram
    participant UI as Signup.jsx
    participant API as authAPI.js
    participant SERVER as POST /auth/signup
    participant DB as MongoDB

    UI->>API: signUp(signupData, otp, navigate)
    API->>SERVER: Axios POST { firstName, lastName, email, password, confirmPassword, otp }
    SERVER->>DB: OTP.findOne({email}) → validate OTP
    SERVER->>DB: bcrypt.hash(password)
    SERVER->>DB: Profile.create({ gender, dob, about, contact → null })
    SERVER->>DB: User.create({ ...userPayload, additionalDetails: profileId })
    SERVER-->>API: { success: true, message: "account created successfully" }
    API->>UI: alert + navigate("/login")
```

**Key Note**: No token is returned on signup. User must login separately.

---

### 2. Login Flow

```mermaid
sequenceDiagram
    participant UI as Login.jsx
    participant API as authAPI.js
    participant SERVER as POST /auth/login
    participant DB as MongoDB
    participant LS as LocalStorage
    participant Redux as Redux Store

    UI->>API: dispatch(login(email, password, navigate))
    API->>SERVER: Axios POST { email, password }
    SERVER->>DB: User.findOne({email}).populate("additionalDetails")
    SERVER->>SERVER: bcrypt.compare(password, user.password)
    SERVER->>SERVER: jwt.sign(payload, JWT_SECRET, {expiresIn: "1d"})
    SERVER->>SERVER: res.cookie("token", token, { httpOnly: true, expires: 24hrs })
    SERVER-->>API: { success: true, user: { ...userDetails, token } }

    API->>LS: localStorage.setItem("token", response.data.user.token)
    API->>LS: localStorage.setItem("user", response.data.user)
    API->>Redux: dispatch(setToken(token))
    API->>Redux: dispatch(setUser(user))
    API->>UI: alert + navigate("/")
```

> [!IMPORTANT]
> The token lives in **two places**: as an `httpOnly` cookie (for server-side auth) AND in `localStorage` (for frontend Redux state). The frontend reads from `localStorage`, the middleware reads from the cookie/Authorization header.

---

### 3. Logout Flow

```mermaid
sequenceDiagram
    participant UI as Navbar/Settings
    participant API as authAPI.js
    participant LS as LocalStorage
    participant Redux as Redux Store

    UI->>API: dispatch(logout(navigate))
    API->>Redux: dispatch(setToken(null))
    API->>Redux: dispatch(setUser(null))
    API->>LS: localStorage.removeItem("token")
    API->>LS: localStorage.removeItem("user")
    API->>UI: alert + navigate("/")
```

---

### 4. Forgot Password Flow

```mermaid
sequenceDiagram
    participant UI as ForgotPassword.jsx
    participant API as authAPI.js
    participant SERVER as POST /auth/reset-password-token
    participant DB as MongoDB
    participant MAIL as NodeMailer

    UI->>API: getPasswordResetToken(email)
    API->>SERVER: Axios POST { email }
    SERVER->>DB: User.findOne({email})
    SERVER->>SERVER: crypto.randomUUID() → token
    SERVER->>DB: User.findOneAndUpdate → { token, resetPasswordExpires: now + 5min }
    SERVER->>MAIL: mailSender(email, "Reset Link", url)
    SERVER-->>API: { success: true }
    API->>UI: alert("Reset email sent!")

    Note over UI,DB: User clicks link → /update-password/:token

    UI->>API: resetPassword(password, confirmPassword, token)
    API->>SERVER: Axios POST /auth/reset-password { password, confirmPassword, token }
    SERVER->>DB: User.findOne({ token, resetPasswordExpires: { $gt: now } })
    SERVER->>DB: bcrypt.hash(newPassword) → User.findOneAndUpdate
    SERVER-->>API: { success: true }
    API->>UI: alert + navigate("/reset-complete")
```

---

## ⚙️ Settings Flows

All settings routes are **protected** — the `auth` middleware runs first to verify the JWT from the `Authorization: Bearer <token>` header.

### Auth Middleware (runs on every protected route)

```
Request Header: { Authorization: "Bearer <jwt_token>" }
    ↓
auth middleware → jwt.verify(token, JWT_SECRET)
    ↓
Attaches req.user = { email, id, role }
    ↓
Passes to Controller
```

---

### 5. Update Profile Picture

```mermaid
sequenceDiagram
    participant UI as Settings.jsx
    participant API as SettingsAPI.js
    participant MID as auth middleware
    participant SERVER as PUT /profile/updateDisplayPicture
    participant CLOUD as Cloudinary
    participant DB as MongoDB
    participant LS as LocalStorage
    participant Redux as Redux Store

    UI->>API: dispatch(updateDisplayPicture(token, formData))
    Note over API: formData contains { profilePicture: File }
    API->>MID: PUT request with Authorization header + multipart/form-data
    MID->>MID: jwt.verify(token) → sets req.user
    MID->>SERVER: passes to updateProfilePicture controller
    SERVER->>CLOUD: uploadImgToCloudinary(imageFile, FOLDER_NAME)
    SERVER->>DB: User.findById(userId)
    SERVER->>CLOUD: cloudinary.uploader.destroy(oldPublicId) [delete old image]
    SERVER->>DB: User.findByIdAndUpdate(userId, { image: uploadResult.secure_url })
    SERVER-->>API: { success: true, data: updatedUser }

    API->>Redux: dispatch(setUser(response.data.data))
    API->>LS: localStorage.setItem("user", updatedUser)
    API->>UI: alert("Display Picture Updated Successfully")
```

---

### 6. Update Profile (Bio/Contact/Gender)

```mermaid
sequenceDiagram
    participant UI as Settings.jsx
    participant API as SettingsAPI.js
    participant MID as auth middleware
    participant SERVER as PUT /profile/updateProfile
    participant DB as MongoDB
    participant LS as LocalStorage
    participant Redux as Redux Store

    UI->>API: dispatch(updateProfile(token, formData))
    Note over API: formData = { gender, dateOfBirth, about, contactNumber }
    API->>MID: PUT request with Authorization header
    MID->>MID: jwt.verify(token) → sets req.user.id
    SERVER->>DB: User.findById(userId) → get profileId (additionalDetails ref)
    SERVER->>DB: Profile.findByIdAndUpdate(profileId, { dob, about, gender, contact })
    SERVER-->>API: { success: true, data: updatedProfile }
    Note over API: Response does NOT return full user — SettingsAPI.js reads updatedUserDetails
    API->>Redux: dispatch(setUser({ ...updatedUserDetails, image: userImage }))
    API->>LS: localStorage.setItem("user", updatedUser)
    API->>UI: alert("Profile Updated Successfully")
```

> [!WARNING]
> The backend `updateProfile` returns `data: updatedProfile` (just the Profile doc), but the frontend reads `response.data.updatedUserDetails`. **This is a mismatch** — the frontend expects a key `updatedUserDetails` but the backend sends `data`. This may cause the user in Redux to not update correctly.

---

### 7. Change Password

```mermaid
sequenceDiagram
    participant UI as Settings.jsx
    participant API as SettingsAPI.js
    participant MID as auth middleware
    participant SERVER as POST /auth/changepassword
    participant DB as MongoDB
    participant MAIL as NodeMailer

    UI->>API: changePassword(token, formData)
    Note over API: formData = { oldPassword, newPassword, confirmNewPassword }
    API->>MID: POST request with Authorization header
    MID->>MID: jwt.verify(token) → sets req.user.id
    SERVER->>DB: User.findById(userId)
    SERVER->>SERVER: bcrypt.compare(oldPassword, user.password)
    SERVER->>DB: bcrypt.hash(newPassword) → User.findByIdAndUpdate
    SERVER->>MAIL: mailSender(email, "Password Changed", notificationEmail)
    SERVER-->>API: { success: true, message: "Password changed successfully" }
    API->>UI: alert("Password Changed Successfully")
```

---

### 8. Delete Account

```mermaid
sequenceDiagram
    participant UI as Settings.jsx
    participant API as SettingsAPI.js
    participant MID as auth middleware
    participant SERVER as DELETE /profile/deleteProfile
    participant DB as MongoDB
    participant Redux as Redux Store
    participant LS as LocalStorage

    UI->>API: dispatch(deleteProfile(token, navigate))
    API->>MID: DELETE request with Authorization header
    MID->>MID: jwt.verify(token) → sets req.user.id
    SERVER->>DB: User.findById(userId)
    SERVER->>DB: Profile.findByIdAndDelete(profileId)
    SERVER->>DB: User.findByIdAndDelete(userId)
    SERVER->>DB: Course.findOneAndDelete({studentsEnrolled: userId})
    SERVER-->>API: { success: true }

    API->>Redux: dispatch(logout(navigate))
    Note over Redux,LS: logout clears Redux state + removes token/user from localStorage
    API->>UI: alert + navigate("/")
```

---

## 📦 State Management Summary

| Data | Where Stored | When Set | When Cleared |
|------|-------------|----------|--------------|
| `token` | Redux + LocalStorage | On login | On logout / account delete |
| `user` | Redux + LocalStorage | On login, profile update, picture update | On logout / account delete |
| `cart` | Redux + LocalStorage | On addToCart | On removeFromCart / resetCart |
| `total` | Redux + LocalStorage | On addToCart | On removeFromCart / resetCart |
| `totalItems` | Redux + LocalStorage | On addToCart | On removeFromCart / resetCart |

---

## ⚠️ Known Issues / Things to Fix

1. **Profile update response key mismatch**: Backend returns `data` but frontend reads `updatedUserDetails` → Redux user state won't update after profile edit.
2. **Token not in JSON body**: The login response doesn't include `response.data.token` directly — it's nested as `response.data.user.token`. The frontend handles this with `response.data.token || response.data.user?.token`.
3. **Password reset token expiry**: Only 5 minutes — may be too short for email delivery delays.
4. **Cookie is httpOnly**: The cookie is correctly `httpOnly`, but the backend auth middleware should be reading it from `req.cookies.token` OR `req.headers.authorization`. Check that the middleware handles both.
