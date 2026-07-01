import { SmallFooter, SmallHeader } from "@components/common";
import CreateHikeForm from "@components/hike/CreateHikeForm";
import { useAvailableTrails } from "@hooks/dataHooks/trailHooks";

import "./CreateHike.scss";

const CreateHike = () => {
  const { data: traildata } = useAvailableTrails(true);

  return (
    <main className="form-container trail-form">
      <SmallHeader />

      <h1>Create hike</h1>

      <CreateHikeForm availableTrails={traildata || []} maxItems={1} />
      <SmallFooter />
    </main>
  );
};

export default CreateHike;
