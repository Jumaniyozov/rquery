import { useQuery } from "react-query";
import { possibleStatus } from "../helpers/defaultData.js";
import { useUserData } from "../helpers/useUserData.js";
import { GoIssueClosed, GoIssueOpened } from "react-icons/go";
import { relativeDate } from "../helpers/relativeDate.js";

export const useIssueData = (issueNumber) => {
  const issueData = useQuery(["issues", issueNumber], () => {
    return fetch(`/api/issues/${issueNumber}`).then((res) => res.json());
  });

  return issueData;
};
export const IssueHeader = ({
  title,
  number,
  createdBy,
  createdDate,
  comments,
  status = "todo",
}) => {
  const statusObject = possibleStatus.find((pstatus) => pstatus.id === status);
  const createdUser = useUserData(createdBy);

  return (
    <header>
      <h2>
        {title} <span>#{number}</span>
      </h2>
      <div>
        <span
          className={
            status === "done" || status === "cancelled" ? "closed" : "open"
          }
        >
          {status === "done" || status === "cancelled" ? (
            <GoIssueClosed />
          ) : (
            <GoIssueOpened />
          )}
          {statusObject.label}
        </span>
        <span className="created-by">
          {createdUser.isLoading ? <p>Loading...</p> : createdUser.data?.name}
        </span>{" "}
        opened this issue {relativeDate(createdDate)} | {comments.length}{" "}
        comments
      </div>
    </header>
  );
};
