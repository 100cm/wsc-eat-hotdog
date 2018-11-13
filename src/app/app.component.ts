import {Component, ComponentFactoryResolver, NgZone, OnInit, ViewChild} from '@angular/core';
import {fromEvent, interval, merge, Observable, Subscription, timer} from 'rxjs';
import {concatAll, concatMap, filter, map, mergeAll, mergeMap, switchMap, take, takeUntil} from 'rxjs/operators';
import {PointContainerComponent} from './point-container/point-container.component';
import {PointBonusComponent} from './point-bonus/point-bonus.component';

interface HotDog {
  x: number
  y?: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  mouse_position: { x: number } = {x: 0};

  hot_dogs: HotDog[] = [];

  score = 0;

  next_time = 30;

  started = false;

  subscription: Subscription = Subscription.EMPTY;

  observable: Observable<any>;

  next_sub: Subscription = Subscription.EMPTY;

  @ViewChild(PointContainerComponent) pc: PointContainerComponent;

  ngOnInit(): void {

    let mouseMove = fromEvent(document, 'mousemove');

    mouseMove.subscribe((event: MouseEvent) => {
      this.mouse_position = {x: event.x};
    });

    this.observable = interval(500).pipe(map(index => {
      this.ngZone.runOutsideAngular(_ => {
          this.hot_dogs.push({
              x: Math.random() * document.body.offsetWidth,
              y: 0
            }
          );
        }
      );
      return index;
    }), map((index) => interval(10).pipe(map(_ => {
      if (this.hot_dogs[index]) {
        this.ngZone.runOutsideAngular(_ => {
          this.hot_dogs[index].y += 10;
        });
      }
      return index;
    }))), mergeAll());

  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private ngZone: NgZone) {
  }

  viewContainerRef;

  currentAdIndex = 0;

  loadComponent() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(PointBonusComponent);
    this.viewContainerRef = this.pc.viewContainerRef;
    let componentRef = this.viewContainerRef.createComponent(componentFactory);
    (<PointBonusComponent>componentRef.instance).x = this.mouse_position.x + 90;
    this.currentAdIndex += 1;
    let index = this.currentAdIndex;
    setTimeout(_ => {
      this.removeComponent(index);
    }, 1000);
    return this.currentAdIndex;
  }

  removeComponent(index) {
    this.viewContainerRef.remove(index);
  }

  startGame() {
    this.score = 0;
    this.next_time = 30;
    this.started = true;
    this.subscription = this.observable.subscribe(data => {
      this.ngZone.runOutsideAngular(_ => {
        if (this.hot_dogs[data] && this.hot_dogs[data].y > document.body.offsetHeight - 100) {
          if (this.mouse_position.x - 10 <= this.hot_dogs[data].x && this.hot_dogs[data].x < this.mouse_position.x + 80) {
            this.score += 1;
            this.loadComponent();
          }
          this.hot_dogs.splice(data, 1);
        }
      });
    });
    this.next_sub = interval(1000).pipe(filter(x => x < 30)).subscribe(data => {
      if (data < 30) {
        this.next_time -= 1;
      }
      if (data == 29) {
        this.finishGame();
      }
    });
  }

  finishGame() {
    this.next_sub.unsubscribe();
    this.subscription.unsubscribe();
    this.started = false;
  }

  goGitHub() {
    window.location.href = 'https://github.com/100cm/wsc-eat-hotdog';
  }

}
