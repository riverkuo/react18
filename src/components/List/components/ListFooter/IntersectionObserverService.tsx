import { OnReachEnd } from '../../types';

type DivRefType = HTMLDivElement | null;
type SetBooleanState = React.Dispatch<React.SetStateAction<boolean>>;

type ServiceConstructorTypes = {
  target: DivRefType;
  onReachEnd?: OnReachEnd;
  options?: IntersectionObserverInit;
  setIsEndIntersecting: SetBooleanState;
};

export class IntersectionObserverService {
  private target: DivRefType = null;
  private onReachEnd?: OnReachEnd;
  private setIsEndIntersecting: SetBooleanState;
  private observer: IntersectionObserver | null = null;

  private isIntersecting = false;

  constructor(constructor: ServiceConstructorTypes) {
    this.target = constructor.target;
    this.onReachEnd = constructor.onReachEnd;
    this.setIsEndIntersecting = constructor.setIsEndIntersecting;
    this.observer = new IntersectionObserver(this.intersectCallback.bind(this), constructor?.options);
  }

  public observe() {
    if (this.target && this.observer) {
      this.observer.observe(this.target);
    }
  }

  public unobserve() {
    if (this.target && this.observer) {
      this.observer.unobserve(this.target);
    }
  }

  private async intersectCallback(entries: IntersectionObserverEntry[]) {
    const entry = entries[0];
    if (entry.isIntersecting && !this.isIntersecting) {
      this.isIntersecting = true;
      this.setIsEndIntersecting(true);

      await this.onReachEnd?.();

      this.isIntersecting = false;
      this.setIsEndIntersecting(false);
    }
  }
}
