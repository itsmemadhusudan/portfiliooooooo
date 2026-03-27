import { PortfolioData } from "@/data/portfolio";

type SkillsProps = {
  skills: PortfolioData["skills"];
  currentlyLearning: PortfolioData["currentlyLearning"];
};

export function Skills({ skills, currentlyLearning }: SkillsProps) {
  return (
    <section className="section card animate-up" id="skills">
      <h3>Skills</h3>
      <div className="skillGroups">
        <SkillGroup title="Backend" items={skills.backend} />
        <SkillGroup title="Frontend" items={skills.frontend} />
        <SkillGroup title="Related" items={skills.related} />
        <SkillGroup title="Professional Skills" items={skills.soft} />
        <SkillGroup title="Currently Learning" items={currentlyLearning} />
      </div>
    </section>
  );
}

type SkillGroupProps = {
  title: string;
  items: string[];
};

function SkillGroup({ title, items }: SkillGroupProps) {
  return (
    <div>
      <p className="groupTitle">{title}</p>
      <ul className="chips" aria-label={title}>
        {items.map((item) => (
          <li key={item} className="chip">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
