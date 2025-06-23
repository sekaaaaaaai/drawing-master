import axios from 'axios';

// 型定義
export interface DrawingRecord {
  id: number;
  number: string;
  name: string;
  remarks: string | null;
  cad_file_url: string;
  pdf_file_url: string;
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
 * 図面登録
 * @param data 図面データ
 * @returns 登録した図面データ
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

/**
 * 図面一覧取得
 * @returns 図面データ配列
 */
export async function get(): Promise<DrawingRecord[]> {
  try {
    const response = await api.get<DrawingRecord[]>(
      '/drawings'
    );
    return response.data;
  } catch (err: any) {
    console.error(err);
    throw err;
  }
}

/**
 * 図面詳細取得
 * @returns 図面データ
 */
export async function find(id: number): Promise<DrawingRecord> {
  try {
    const response = await api.get<DrawingRecord>(
      `/drawings/${id}`
    );
    console.log(response);
    return response.data;
  } catch (err: any) {
    throw err;
  }
}

export function ToString_NumberAndName(drawing: DrawingRecord) :string {
  return `${drawing.number}${drawing.name ? `(${drawing.name})` : ''}`;
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