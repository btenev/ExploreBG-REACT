import CreateAccommodationForm from "@components/accommodation/CreateAccommodationForm";
import { SmallFooter, SmallHeader } from "@components/common";
import { useAccommodationEnums } from "@hooks/dataHooks/utilityHooks";

import "./CreateAccommodation.scss";

const CreateAccommodation = () => {
  const { data: enumData } =
    useAccommodationEnums(true); /*TODO: Fix the logic*/
  return (
    <main className="form-container accommodation-form">
      <SmallHeader />

      <h1>Create accommodation</h1>
      {enumData && <CreateAccommodationForm enumData={enumData} />}

      <SmallFooter />
    </main>
  );
};

export default CreateAccommodation;
