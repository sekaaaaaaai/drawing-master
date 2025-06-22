import axios from 'axios';

// 型定義
export interface DrawingRecord {
  number: string;
  name: string;
  remarks: string | null;
  cad_file: File;
  pdf_file: File;
  created_at: string;
  updated_at: string;
}

// Axiosインスタンス（ベースURLと共通ヘッダー）
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // headers: {
  //   'x-api-key': import.meta.env.VITE_API_KEY,
  // },
});


export interface PostDrawingParams {
  number: string;
  name: string;
  remarks: string | null;
  cad_file: File | null;
  pdf_file: File | null;
}
/**
 * 打刻履歴を取得する
 * @param idm カードIDm
 * @param limit 最大取得件数（デフォルト: 8）
 * @returns PunchRecord配列
 * @throws Error（401なら「利用登録されていないカードです。」）
 */
export async function post(data: any): Promise<DrawingRecord> {
  try {
    const response = await api.post<DrawingRecord>(
      '/drawings', 
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (err: any) {
    throw err;
  }
}


// /**
//  * レコードを「日付 時刻: ラベル」の形式に整形する
//  * @param records JSONデータの配列
//  * @returns 整形済み文字列配列
//  */
// export function formatPunchRecords(records: PunchRecord[]): string[] {
//   return records.map((item) => {
//     const label = labelMap[item.n03kubun] || item.n03kubun;

//     // 弁当注文の場合はメニューを末尾に追加
//     const menuSuffix =
//       item.n03kubun === 'bento' && item.n03menu
//         ? `（${menuMap[item.n03menu]}）`
//         : '';

//     return `${item.n03date} ${item.n03time}: ${label}${menuSuffix}`;
//   });
// }