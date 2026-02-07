import styles from './main.module.css';
import { Label } from './components/label/label';
import { Comment } from './components/comment/comment';
import { Field } from './components/field/field';

type Props = {
  label?: string;
  comment?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

export class Input {
  private el: HTMLDivElement;
  private field: Field;

  constructor({ label, comment, placeholder, value, disabled = false, onChange }: Props = {}) {
    this.el = document.createElement('div');
    this.el.className = styles['wrapper'];

    if (label) {
      new Label(label).mount(this.el);
    }

    this.field = new Field({ placeholder, value, disabled, onChange });
    this.field.mount(this.el);

    if (comment) {
      new Comment(comment).mount(this.el);
    }
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  getValue(): string {
    return this.field.getValue();
  }

  disable(): void {
    this.field.disable();
  }

  enable(): void {
    this.field.enable();
  }
}
