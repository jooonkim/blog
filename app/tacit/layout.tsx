import '../agentic-selling/post.css';
import Contents from '../agentic-selling/contents';

export default function TacitLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Contents />
      <article className="agentic-post">{children}</article>
    </>
  );
}
