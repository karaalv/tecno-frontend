import React from "react";
import "@/styles/MilestoneProgressBar.css";

type GroupData = Record<string, any>;

function isGroupComplete(group: any): boolean {
  if (!Array.isArray(group)) return false;
  return group.every((value) => value !== null && value !== undefined);
}

interface ProgressBarProps {
  data: GroupData;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ data }) => {
  const groupEntries = Object.entries(data);

  return (
    <div className="milestone-bar">
      {groupEntries.map(([groupName, groupValues], index) => {
        const complete = isGroupComplete(groupValues);
        const isLast = index === groupEntries.length - 1;

        return (
          <React.Fragment key={groupName}>
            <div
              className={`milestone-circle ${complete ? "complete" : ""}`}
              title={groupName}
            >
              {complete ? "✓" : groupEntries.length - index}
            </div>
            {!isLast && <div className="milestone-line" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressBar;
