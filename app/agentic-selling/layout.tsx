import './post.css';

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return <article className="agentic-post">{children}</article>;
}
