import { SmallFooter, SmallHeader } from "@components/common";
import CreateDestinationForm from "@components/destination/CreateDestinationForm";
import { useDestinationEnums } from "@hooks/dataHooks/utilityHooks";

import "./CreateDestination.scss";

const CreateDestination = () => {
  const { data: enumData } = useDestinationEnums(true); /*TODO: Fix the logic*/

  return (
    <main className="form-container destination-form">
      <SmallHeader />

      <h1>Create destination</h1>
      {enumData && <CreateDestinationForm formEnums={enumData} />}

      <SmallFooter />
    </main>
  );
};

export default CreateDestination;
