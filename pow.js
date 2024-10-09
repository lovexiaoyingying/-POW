const crypto = require('crypto');

// 自己的昵称
const nickname = "xiaoxiao";

// POW 函数
function proofOfWork(targetZeros) {
    let nonce = 0;
    const startTime = Date.now();
    
    while (true) {
        const data = `${nickname}${nonce}`;
        const hash = crypto.createHash('sha256').update(data).digest('hex');
        
        // 检查是否满足前面是 targetZeros 个 0
        if (hash.startsWith('0'.repeat(targetZeros))) {
            const endTime = Date.now();
            console.log(`目标: ${targetZeros} 个 0`);
            console.log(`花费时间: ${(endTime - startTime) / 1000} 秒`);
            console.log(`Hash 内容: ${nickname}${nonce}`);
            console.log(`Hash 值: ${hash}\n`);
            break;
        }
        
        nonce += 1;
    }
}

// 查找以 4 个 0 开头的哈希值
proofOfWork(4);

// 查找以 5 个 0 开头的哈希值
proofOfWork(5);
