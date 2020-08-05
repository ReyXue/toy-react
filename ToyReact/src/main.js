import { ToyReact, Component } from './ToyReact.js';
class MyComponent extends Component {
    render() {
        return <div>
                <span>Hello</span>
                <span>World</span>
                <div>
                    {true}
                    {this.children}
                </div>
            </div>;
    }
}

const a = <MyComponent name="a" id="ida">
    <div>child</div>
</MyComponent>;

ToyReact.render(
    a,
    document.body,
)
/*
  ToyReact.createElement('div', {className: 'shopping-list'},
    ToyReact.createElement('h1', ... h1 children ... ),
    ToyReact.createElement('ul',  ... ul children ...)
  )
*/
