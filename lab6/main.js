
const asyncAdd = async (a, b) => {

    if (typeof a !== 'number' || typeof b !== 'number') {
        return Promise.reject('Argumenty muszą mieć typ number!')
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 100)
    })
}
let promises =[]
const asyncSum = async (...args) => {


    do {
        const asyncRes = args.reduce(async (memo, e) => {
           return asyncAdd((await memo), e)
        }, Promise.resolve(0));
        //console.log(asyncRes)
        return promises.push(asyncRes)

        // const asyncRes = args.reduce(async (memo, e) => {
        //     return asyncAdd((await memo), e)
        // }, Promise.resolve(0));
        // return asyncRes

        //   console.log(promises)
        //   console.log(result)

        // console.log(asyncRes)
        // console.log("________")
        // temp+=2
        // args=args.splice(2,args.length)
    } while (args.length<=0);

   




    //  temp += asyncRes

    // const asyncRes = await args.slice(6).reduce(async (memo, e) => {
    //     return asyncAdd((await memo) ,e)
    //   }, Promise.resolve(0));
    //return temp

}

const t0 = performance.now();
console.log(await asyncSum(5, 5, 5, 5, 5, 5, 5, 5, 5, 5))
Promise.all(promises).then((values) => {
    console.log(values);
    const t1 = performance.now();
    console.log(t1 - t0)
  })


