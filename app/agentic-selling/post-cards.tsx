type Card = {
  title: string;
  fields: { label: string; value: string }[];
};

export default function InfoCards({ items }: { items: Card[] }) {
  return (
    <div className="post-cards">
      {items.map((item) => (
        <section className="post-card" key={item.title}>
          <h4>{item.title}</h4>
          <dl>
            {item.fields.map((field) => (
              <div key={field.label}>
                <dt>{field.label}</dt>
                <dd>{field.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
