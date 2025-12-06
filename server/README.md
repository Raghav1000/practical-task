## 🧩 Server App (Backend)

### ✅ Implemented Features
- User CRUD with Search & Pagination
- Register & Login with JWT token generation
- Profile API for logged-in user
- Create Post API
- Like & Unlike Post
- Post listing with:
  - Total Likes
  - Recent Liked Users (Max 5)
- Swagger API documentation added

---

### ⚠️ Known Skips / Assumptions
1. **Authentication middleware is skipped** (JWT generation works, but route guards are not enforced).
2. **Image upload is skipped** (only image URL is stored).
3. **Role-based authorization is not implemented**.

---

### 🔧 Suggested Enhancements
- Enforce JWT authentication using guards
- Implement role-based access control (Admin/User)
- Add image upload with cloud storage
- Add unit & e2e tests

---

## 🚀 Migration & Seeding
- Commands to **generate, run, and revert migrations** are commented in `data-source.ts`.
- Use the following command to generate dummy data:
  ```bash
  pnpm run seed
