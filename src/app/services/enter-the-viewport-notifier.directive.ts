import {Directive, ElementRef, EventEmitter, Host, Output} from "@angular/core";

@Directive({
  selector: '[appEnterTheViewportNotifier]',
})
export class EnterTheViewportNotifierDirective {
  // Издатель события, который сработает при попадании элемента с директивой на экран
  // Издаёт true, когда элемент появляется на экране и flase когда выходит с области видимости.
  @Output() visibilityChange = new EventEmitter<boolean>();
  private observer!: IntersectionObserver;

  // Ссылка на HTML элемент, содержащий директиву
  constructor(@Host() private elementRef: ElementRef) {
  }

  // Здесь мы создадим сам наблюдатель и настройки к нему.
  // А еще подпишемся на отлсеживание компонента.
  ngAfterViewInit(): void {
    const options = {root: null, rootMargin: '0px', threshold: 0.0};
    this.observer = new IntersectionObserver(this.callback, options);
    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  // Обыкновенный колбэк, который проверяет наличие на экране IntersectionObserver,
  // как только элемент попадёт на экран, сработает издаст true,
  // выйдет за пределы false.
  /**
   * Издаст событие при попадании элумента на экран.
   * @param entries
   * @param observer
   */
  private callback = (entries: any) => {
    entries.forEach((entry: any) => {
      this.visibilityChange.emit(entry.isIntersecting ? true : false);
    });
  };
}
