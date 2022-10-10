import { useHistory } from "react-router-dom";

function Navigate({ to }) {
  const history = useHistory();

  history.push(to);

  return null;
}

export default Navigate;
