const DEGREE_TO_KM = 111.23551915;

export const calcDegreeDistance = (distance: number): number => {
  return distance / DEGREE_TO_KM;
}
