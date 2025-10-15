# 🚀 IntraQ

**IntraQ** is a real-world web app built to help **freshers and students** prepare for interviews.  
It allows users to **browse, post, and share interview questions** asked by real companies — and help others by contributing their own experiences.

---


# Live link


## 🧠 About

IntraQ is a learning and sharing platform where users can:
- Post interview questions from real companies.
- Explore top company questions.
- Find answers shared by other developers.
- Bookmark and upvote questions to mark them as legit.
- Login securely using Google authentication.
- Edit or delete their own posts easily.

---

## 🧩 Tech Stack

**Frontend & Backend**
- ⚡ **Next.js 15** (App Router)
- ⚛️ **React 19**
- 🧠 **Zustand** for state management
- 🌐 **Axios** for API calls
- 🔐 **NextAuth.js** for Google login
- 🍃 **Mongoose** for MongoDB ORM
- 💅 **TailwindCSS v4** + **DaisyUI** for styling
- 🔥 **React Hot Toast** for notifications

---

## 📁 Folder Structure

``` bash
src/
│
├── app/
│ ├── api/ # API routes
│ ├── middlewares/ # Auth & middleware logic
│ ├── store/ # Zustand store
│ ├── not-found.tsx # 404 page
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Home page
│ └── globals.css # Global styles
│
├── components/ # Reusable UI components
├── lib/ # DB connection, utils
├── models/ # Mongoose schemas
├── types/ # TypeScript interfaces
│
├── public/ # Static assets
└── ...

```


---

## ✨ Features

✅ Post your own interview questions  
✅ Get top company interview questions  
✅ View and share solutions  
✅ Search questions by keyword  
✅ Bookmark questions for later  
✅ Upvote & Downvote system to validate questions  
✅ Google Login for secure access  
✅ Edit & Delete your posts  
✅ Beautiful, responsive UI  

---

## 🧰 Installation

1. **Clone the repo**
   ``` bash
   git clone https://github.com/your-username/intraq.git
   cd intraq
   ```
2. **Install dependencies**

```bash
npm install
```
3. **Create .env.local**
```bash
MONGO_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```
4. **Run the dev server**

``` bash
npm run dev
```

Open http://localhost:3000 🚀

# 🧑‍💻 Author

Sanmith Devadiga
💼 Full Stack Developer
📧 sanmithdevadiga91@gmail.com

🩵 License

This project is open-source and available under the MIT License.

🌟 Star the repo if you like it!

Your support motivates me to keep building cool projects 💪


---

Would you like me to make it auto-generate badges (like version, tech stack logos, and license) for GitHub? It’ll make your README look more pro.
