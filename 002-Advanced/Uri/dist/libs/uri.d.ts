/** Uri 處理 */
export declare class Uri {
    private _protocol;
    private _hostname;
    private _port;
    private _pathname;
    private _search;
    private _hash;
    constructor(baseUrl: string, ...params: string[]);
    /** 設定 Href */
    setHref(href: string, ...params: string[]): Uri;
    /** 轉成字串 */
    toString(): string;
    /** 設定 Protocol (ex: 'http', 'https', 'ws', 'wss' or 'ftp') */
    setProtocol(protocol: string): Uri;
    /** 取得 Protocol (ex: 'http:', 'https:', 'ws:', 'wss:' or 'ftp:') */
    getProtocol(): string;
    /** 取代 Protocol (ex: 'http:', 'https:', 'ws:', 'wss:' or 'ftp:') */
    replaceProtocol(oldProtocol: string, newProtocol: string): Uri;
    /** 格式化 Protpcol */
    protected formatProtocal(protocol: string): string;
    /** 設定 Host Name (ex: 'www.example.com' */
    setHostName(hostName: string): Uri;
    /** 取得 Host Name (ex: 'www.example.com' */
    getHostName(): string;
    /** 設定 Host */
    setHost(hostName: string, port: number): Uri;
    /** 取得 Host (ex: 'www.example.com:443' or ''www.example.com:80') */
    getHost(): string;
    /** 設定 Port */
    setPort(port: number): Uri;
    /** 取得 Port */
    getPort(): string;
    /** 設定 PathName (覆寫掉 PathName) */
    setPathName(pathName: string): Uri;
    /** 串接 PathName */
    joinPathName(...pathNames: string[]): Uri;
    /** 取得 PathName */
    getPathName(): string;
    /** 格式化 PathName */
    protected formatPathName(pathName: string): string;
    /** 設定 Search (ex: '?id=3' or '?id=3&name=apple') */
    setSearch(query: string | Map<string, string> | object): Uri;
    /** 取得 Search */
    getSearch(): string;
    /** 格式化 Search 字串 */
    protected formatSearchString(query: string): string;
    /** 取得 Query 字串 */
    protected getQueryAppendString(key: string, value: string, isFirstIndex: boolean): string;
    /** 新增 Query Parameter */
    addQuery(key: string, value?: string): Uri;
    /** 新增更多的 Query Parameter */
    addMoreQuery(query: Map<string, string> | object): Uri;
    /** 刪除指定 Query */
    removeQuery(key: string): Uri;
    /** 取得 Query (Map<string, string>) */
    getQueryMap(): Map<string, string>;
    /** 取得 Query (object) */
    getQueryData(): object;
    /** 取得 Path */
    getPath(): string;
    /** 設定 Hash (ex: '#1') */
    setHash(hash: string): Uri;
    /** 取得 Hash (ex: '#1') */
    getHash(): string;
    /** 格式化 Hash */
    protected formatHash(hash: string): string;
    /** 複製 */
    clone(): Uri;
}
