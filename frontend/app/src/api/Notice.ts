import axios from 'axios';

// 打刻履歴の型定義（必要に応じて修正してください）
export interface NoticeRecord {
  title: string;
  body: string;
  start_at: string;
  end_at: string;
  show_timing: number;
}

// Axiosインスタンス（ベースURLと共通ヘッダー）
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'x-api-key': import.meta.env.VITE_API_KEY,
  },
});

/**
 * 打刻履歴を取得する
 * @param idm カードIDm
 * @returns NoticeRecord配列
 * @throws Error（401なら「利用登録されていないカードです。」）
 */
export async function fetchNotice(idm: string): Promise<NoticeRecord[]> {
  try {
    const response = await api.get<NoticeRecord[]>('/api/timecard/announces/by_syain_and_date', {
      headers: {
        'x-card-idm': idm,
      },
      params: {
        date: '2025-03-21'
      }
    });
    return response.data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      throw new Error('利用登録されていないカードです。');
    }
    if (err.response) {
      throw new Error(`${err.response.status} ${err.response.statusText}`);
    }
    throw new Error(err.message || '不明なエラーが発生しました');
  }
}
