const crypto = require('crypto');

// 生成 RSA 密钥对
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048, // 密钥的位长度
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
});

console.log('公钥:', publicKey);
console.log('私钥:', privateKey);
// 自己的昵称
const nickname = "xiaoxiao1";
let nonce = 0;
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

// 使用私钥签名
function signData(data, privateKey) {
    const sign = crypto.createSign('SHA256');
    sign.update(data);
    sign.end();
    return sign.sign(privateKey, 'hex');
  }
  
  const dataToSign = nickname + nonce;
  const signature = signData(dataToSign, privateKey);
  console.log('签名:', signature);
  
// 使用公钥验证签名
function verifySignature(data, signature, publicKey) {
    const verify = crypto.createVerify('SHA256');
    verify.update(data);
    verify.end();
    return verify.verify(publicKey, signature, 'hex');
  }
  
  const isValid = verifySignature(dataToSign, signature, publicKey);
  console.log('签名验证结果:', isValid);
  