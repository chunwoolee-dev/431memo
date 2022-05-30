export function now(): string {
    // UTC에 +9시간을 더해서 한국 시간을 만든다.
    // 포맷: YYYY-MM-DD hh:mm:ss
    return new Date(+new Date() + 3240 * 10000)
        .toISOString()
        .replace("T", " ")
        .replace(/\..*/, '');
}