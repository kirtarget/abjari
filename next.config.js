/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SUPABASE_URL: "https://ywvesznjsvtfseqcelai.supabase.co",
    SUPABASE_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3dmVzem5qc3Z0ZnNlcWNlbGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE5NjM2MjUsImV4cCI6MTk3NzUzOTYyNX0.lfmL4RgZ5IRucQT25jgIUdgJ8dX1tCGb8VBm471LKP4",
    SUPABASE_BUCKET: "images",
  },
  images: {
    domains: [
      "ywvesznjsvtfseqcelai.supabase.co",
      "ywvesznjsvtfseqcelai.supabase.in",
      "trpc.io",
    ],
  },
}

module.exports = nextConfig
