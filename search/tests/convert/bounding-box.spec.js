const { addPointsToBbox, mergeBoxes } = require('../../lib/convert/bounding-box');

describe('bbox', () => {
  const testBbox = [-10, -10, 10, 10];
  const testBbox2 = [-20, 10, 44, 7];
  const points = [[100, 20], [5, -5]];
  const lotsOfPoints = [[100, 20], [5, -5], [-40, 73]];
  const WHOLE_WORLD_BBOX = [-180, -90, 180, 90];

  describe('addPointsToBbox', () => {
    it('should create the largest bbox', () => {
      expect(addPointsToBbox(testBbox, points)).toEqual([-10, -10, 100, 20]);
    });

    it('should return the largest box possible from points', () => {
      expect(addPointsToBbox([], points)).toEqual([5, -5, 100, 20]);
    });

    it('should return the biggest box possible from lotsOfPoints', () => {
      expect(addPointsToBbox([], lotsOfPoints)).toEqual([-40, -5, 100, 73]);
    });

    it('should return the largest box possible from points', () => {
      expect(addPointsToBbox(null, points)).toEqual([5, -5, 100, 20]);
    });

    it('should return the biggest box possible from lotsOfPoints', () => {
      expect(addPointsToBbox(null, lotsOfPoints)).toEqual([-40, -5, 100, 73]);
    });

    it('should return the largest box', () => {
      expect(addPointsToBbox(testBbox, lotsOfPoints)).toEqual([-40, -10, 100, 73]);
    });

    it('should return the WHOLE_WORLD_BOX', () => {
      expect(addPointsToBbox(WHOLE_WORLD_BBOX, lotsOfPoints)).toEqual(WHOLE_WORLD_BBOX);
    });

    it('should work.', () => {
      expect(addPointsToBbox([1, 2, 3, 4], [[5, 6], [7, 8]])).toEqual([1, 2, 7, 8]);
    });
  });

  describe('mergeBoxes', () => {
    it('should return box 2', () => {
      expect(mergeBoxes(null, testBbox)).toEqual(testBbox);
    });

    it('should return the WHOLE_WORLD_BBOX', () => {
      expect(mergeBoxes(testBbox, WHOLE_WORLD_BBOX)).toEqual(WHOLE_WORLD_BBOX);
    });

    it('should return a mix of the two testBoxes, making the largest possible box', () => {
      expect(mergeBoxes(testBbox, testBbox2)).toEqual([-20, -10, 44, 10]);
    });
  });
});
