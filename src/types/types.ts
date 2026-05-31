export interface GestureEventType {
    nativeEvent : {
        translationX: number;
        translationY: number;
    }
}

export interface Coordinate {
    x: number;
    y: number;
}

// enum stores fixed values. we can just pick one value from that
export enum Direction {
    Right,
    Up,
    Left,
    Down
}