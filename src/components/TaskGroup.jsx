import TaskItem from "./TaskItem";

export default function TaskGroup({ group, onToggle, onRename, onDelete }) {
  return (
    <section className="mb-8">
      <h2 className="mb-1 flex items-baseline gap-2 font-display text-lg font-extrabold">
        <span className={group.key === "overdue" ? "text-alert" : ""}>{group.label}</span>
        <span className="text-sm font-normal text-muted">{group.tasks.length}</span>
      </h2>
      <ul className="border-t border-line">
        {group.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            overdue={group.key === "overdue"}
            onToggle={onToggle}
            onRename={onRename}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}
