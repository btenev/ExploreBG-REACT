export interface ITrackInfo {
  name: string;
  distance: string;
  startTime: string;
  endTime: string;
  movingTime: string;
  totalTime: string;
  movingPace: string;
  movingSpeed: string;
  totalSpeed: string;
  elevationMin: string;
  elevationMax: string;
  elevationGain: string;
  elevationLoss: string;
  speedMax: string;
  averageHr?: string;
  averageCadence?: string;
  averageTemp?: string;
}
