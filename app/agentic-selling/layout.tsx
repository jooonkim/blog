import './post.css';
import Contents from './contents';

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Contents />
      <article className="agentic-post">{children}</article>
    </>
  );
}
