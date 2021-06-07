const toString = Object.prototype.toString

export class Flatten {

    private object: any

    constructor(obj: any) {
        this.object = obj
    }

    answeredBy() {
        const root: any = {}
        const suffix = toString.call(this.object) === '[object Array]' ? ']' : '';
        (function tree(obj, index) {
            Object.keys(obj).filter(key => Object.prototype.hasOwnProperty.call(obj, key)).forEach((key: any) => {
                root[index + key + suffix] = obj[key]
                if (toString.call(obj[key]) === '[object Array]') tree(obj[key], `${index + key + suffix}[`)
                if (toString.call(obj[key]) === '[object Object]') tree(obj[key], `${index + key + suffix}.`)
            })
        }(this.object, ''))
        return root
    }

    static object(obj: any) {
        return new Flatten(obj)
    }

    toString = () => `the flatten object ${this.object}`
}
