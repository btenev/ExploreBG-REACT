export interface IHut {
  id: number;
  accommodationName: string;
}

export interface IAccommodationCard extends IHut {
  imageUrl: string;
}
