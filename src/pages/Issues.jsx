import { useState } from "react";
import {StatusSelect} from "../components/StatusSelect.jsx";
import LabelList from "../components/LabelList.jsx";
import IssuesList from "../components/IssuesList.jsx";

export default function Issues() {
  const [labels, setLabels] = useState([]);
  const [status, setStatus] = useState("");
  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList labels={labels} status={status} />
        </section>
        <aside>
          <LabelList
            selected={labels}
            toggle={(label) =>
              setLabels((current) =>
                current.includes(label)
                  ? current.filter((currentLabel) => currentLabel !== label)
                  : current.concat(label)
              )
            }
          />
          <h3>Status</h3>
          <StatusSelect
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          />
        </aside>
      </main>
    </div>
  );
}
