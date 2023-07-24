//时钟算法，用于构造一个动态的可维护数组。
class clockAlgorithm {
    constructor(num) {
        this._arr = this.constructor.creatArr(num)
    }
    get arr() {
        return this._arr
    }
    set arr(num) {
        throw new Error('arr is not allowed to be assigned')
    }
    static creatArr(num) {
        let arr = []
        for (let i = 0; i < num; i++) {
            arr.push(i)
        }
        return arr
    }
    addition() {
        this._arr.push(this._arr.shift())
        return this._arr
    }
    subtraction() {
        this._arr.unshift(this._arr.pop())
        return this._arr
    }
    turn(num) {
        if (num !== this._arr[0]) {
            this.addition()
            this.turn(num)
        } 
            return this._arr
    }
}

export default clockAlgorithm