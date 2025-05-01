import './CreateTrail.scss';

import { SmallFooter, SmallHeader } from '../../components/common';
import CreateTrailForm from '../../components/CreateTrailForm/CreateTrailForm';
import { useTrailEnums } from '../../hooks/dataHooks/utilityHooks';
import { useAvailableAccommodations } from '../../hooks/dataHooks/accommodationHooks';
import { useAvailableDestinations } from '../../hooks/dataHooks/destinationHooks';

const CreateTrail = () => {
  const { data: enumData } = useTrailEnums();
  const { data: accommodationData } = useAvailableAccommodations();
  const { data: destinationData } = useAvailableDestinations();

  return (
    <main className="form-container trail-form">
      <SmallHeader />

      <h1>Create trail</h1>
      {enumData && (
        <CreateTrailForm
          formEnums={enumData}
          availableAccommodations={accommodationData || []}
          availableDestinations={destinationData || []}
        />
      )}

      <SmallFooter />
    </main>
  );
};

export default CreateTrail;
