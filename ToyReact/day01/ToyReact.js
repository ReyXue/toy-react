class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttributes(name, value) {
        this.root.setAttributes(name, value);
    }
    appendChild(vchild) {
        vchild.mountTo(this.root);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

export class Component {
    constructor() {
        this.children = [];
    }
    setAttributes(name, value) {
        this[name] = value;
    }
    
    mountTo(parent) {
        const vdom = this.render();
        vdom.mountTo(parent);
    }

    appendChild(vchild) {
        this.children.push(vchild);
    }
}

export const ToyReact = {
    createElement(type, attributes,...children) {
        let element;
        if (typeof type === 'string')
            element = new ElementWrapper(type);
        else
            element = new type;
        for (let name in attributes) {
            // element[name] = attributes[name] wrong
            element.setAttributes(name, attributes[name]);
        }
        let insertChildren = (children) => {
            for (let child of children) {
                if (typeof child === 'object' && child instanceof Array) {
                    insertChildren(child)
                } else {
                    if (!(child instanceof Component) && !(child instanceof ElementWrapper)
                    && !(child instanceof TextWrapper))
                        child = String(child);
                    if (typeof child === 'string')
                        child = new TextWrapper(child);
                    element.appendChild(child);
                }
            }
        }
        insertChildren(children)
        return element;
    },
    render(vdom, element) {
        vdom.mountTo(element);
    }
}