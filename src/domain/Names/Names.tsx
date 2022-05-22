import Elements from "../../components/CrudList/Elements";
import useNames from "../../hooks/useNames";

function Names() {
  return (
    <Elements
      useElements={useNames}
      initialElement={{
        id: 0,
        name: "",
        fields: {
          regex: "",
          replaceWith: "",
        },
      }}
    />
  );
}

export default Names;
