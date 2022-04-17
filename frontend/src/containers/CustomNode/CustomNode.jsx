import classNames from "classnames";
import React from "react";
import { useHistory } from "react-router-dom";
import { PERSON_STATUS_TYPES } from "../../helpers/constants";

import "./res/styles/custom-node.css";

function CustomNode({ person }) {
  const history = useHistory();
  const fullName = `${person.name} ${person.surname}`;

  const handleClick = (e) => {
    history.push(`/people/${person.id}`);
  };

  return (
    <div
      className={classNames({
        "flex-container": true,
        "person-node": true,
        male: person.status === PERSON_STATUS_TYPES.member,
        female: person.status === PERSON_STATUS_TYPES.graduated,
        student: person.status === PERSON_STATUS_TYPES.student,
      })}
      onClick={handleClick}
    >
      <div className="name">{fullName}</div>
      <div className="flex-container fill-space flex-container-row">
        <div className="fill-space">
          <img className="icon" src={person.avatar} alt={fullName} />
        </div>
      </div>
    </div>
  );
}

export default CustomNode;
