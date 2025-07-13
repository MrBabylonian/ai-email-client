# AI Email Client

🚧 **Early Development** - An intelligent, agentic email client built with modern web technologies. Currently in active development.

## 🎯 Vision

This project aims to create an AI-powered email client that helps you manage and interact with your emails more efficiently. We're building towards intelligent email processing, smart organization, and seamless multi-provider integration.

## 🚧 Current Status

**Early Development Phase** - Core infrastructure and basic email integration are being implemented.

### ✅ What's Working

- User authentication with Clerk
- Basic email account linking (Google/Office 365)
- Database setup with Prisma
- Project structure and development environment

### 🔄 In Progress

- Email synchronization and storage
- AI-powered email processing
- User interface development
- Email management features

### 📋 Planned Features

- Intelligent email categorization
- Smart reply suggestions
- Email summarization
- Advanced search and filtering
- Real-time notifications
- Mobile responsiveness

## 🛠️ Tech Stack

This project is built with the [T3 Stack](https://create.t3.gg/) and includes:

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[TypeScript](https://typescriptlang.org)** - Type-safe JavaScript
- **[Clerk](https://clerk.com)** - Authentication and user management
- **[Prisma](https://prisma.io)** - Database ORM
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[tRPC](https://trpc.io)** - End-to-end typesafe APIs
- **[Aurinko](https://aurinko.io)** - Email API integration

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── aurinko/       # Email provider integration
│   │   └── trpc/          # tRPC API endpoints
│   ├── sign-in/           # Authentication pages
│   └── sign-up/           # Registration pages
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
├── server/                # Server-side logic and database
└── styles/                # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- PostgreSQL database
- Clerk account for authentication
- Aurinko account for email integration

### Installation

1. **Clone the repository**

    ```bash
    git clone <your-repo-url>
    cd ai-email-client
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    ```bash
    cp .env.example .env.local
    ```

    Fill in your environment variables:

    ```env
    # Database
    DATABASE_URL="postgresql://..."

    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
    CLERK_SECRET_KEY="sk_..."

    # Aurinko Email API
    AURINKO_CLIENT_ID="your_client_id"
    AURINKO_CLIENT_SECRET="your_client_secret"

    # App URL
    NEXT_PUBLIC_URL="http://localhost:3000"
    ```

4. **Set up the database**

    ```bash
    npx prisma generate
    npx prisma db push
    ```

5. **Start the development server**

    ```bash
    npm run dev
    ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 Current Email Integration

### What Works Now

- **Account Linking**: Connect your Google and Office 365 accounts
- **OAuth Flow**: Secure authentication with email providers
- **Basic Storage**: Account credentials are stored securely

### What's Coming Next

- Email fetching and synchronization
- Email storage and indexing
- Basic email viewing interface

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Database Management

- `npx prisma studio` - Open Prisma Studio
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes to database
- `npx prisma migrate dev` - Create and apply migrations

## 🤝 Contributing

We're in early development and welcome contributions! Here's how you can help:

1. **Report Issues**: Found a bug? Open an issue with detailed steps to reproduce
2. **Feature Requests**: Have ideas for features? Let us know!
3. **Code Contributions**:
    - Fork the repository
    - Create a feature branch (`git checkout -b feature/amazing-feature`)
    - Commit your changes (`git commit -m 'Add amazing feature'`)
    - Push to the branch (`git push origin feature/amazing-feature`)
    - Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep commits small and focused

## 📋 Roadmap

### Phase 1: Foundation ✅ (In Progress)

- [x] Project setup and authentication
- [x] Email account linking
- [ ] Basic email fetching
- [ ] Simple email interface

### Phase 2: Core Features (Planned)

- [ ] Email synchronization
- [ ] Email storage and search
- [ ] Basic email management
- [ ] User preferences

### Phase 3: AI Features (Future)

- [ ] Email categorization
- [ ] Smart reply suggestions
- [ ] Email summarization
- [ ] Intelligent filtering

### Phase 4: Polish (Future)

- [ ] Mobile app
- [ ] Advanced features
- [ ] Performance optimization
- [ ] Production deployment

## 🆘 Support

- **Issues**: Report bugs and feature requests on GitHub
- **Discussions**: Join the conversation in GitHub Discussions
- **Documentation**: Check out the [T3 Stack docs](https://create.t3.gg/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

🚧 **Early Development** - This project is actively being built. Features and APIs may change frequently.

Built with ❤️ using the [T3 Stack](https://create.t3.gg/)
