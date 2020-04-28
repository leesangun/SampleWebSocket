export namespace PackageClient { 
    export interface BaseClient {
        getArea(): number;
    }

    export class Client implements BaseClient {
        public radius: number;
        public static count: number;

        constructor(radius) {
            this.radius = radius;
            Client.count++;
            console.log(Client.count);
        }

        getArea(): number {
            return Math.PI * this.radius * this.radius;
        }
    }

    export function test0(): void {
        console.log('Just print..');
    }
}
