import { fetch } from './util';

export const fetchVehicleTypes = async () => {
  return fetch('getvehiclevariablevalueslist/vehicle type?format=json').then(
    (response) => response.Results
  );
};

export const fetchVehicleMakes = async (type) => {
  return fetch(`GetMakesForVehicleType/${type}?format=json`).then(
    (response) => response.Results
  );
};

const fetchVehicleModelsBySingleMakeId = async (makeId, type, year) => {
  let url = `GetModelsForMakeIdYear/makeId/${makeId}`;
  if (year) {
    url += `/modelyear/${year}`;
  }
  url += `/vehicletype/${type}?format=json`;

  return fetch(url);
};

export const fetchVehicleModelsByMultipleMakeIds = async (
  makeIds,
  type,
  year
) => {
  const proms = makeIds.map((id) =>
    fetchVehicleModelsBySingleMakeId(id, type, year)
  );

  return Promise.all(proms).then((responses) =>
    responses.flatMap((r) => r.Results)
  );
};
