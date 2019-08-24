export declare class Scalar extends Array<number> {
  public static all(...v: number[]): Scalar;
}

export declare class Point {
  public constructor(x: number, y: number);
  public x: number;
  public y: number;
}

export declare class Size {
  public constructor(width: number, height: number);
  public width: number;
  public height: number;
}

export declare class Rect {
  public constructor(x: number, y: number, width: number, height: number);
  public x: number;
  public y: number;
  public width: number;
  public height: number;
}
