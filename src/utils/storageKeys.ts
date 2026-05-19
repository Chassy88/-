export const STORAGE_KEYS = {
  userPhoto: 'cheer-lab-user-photo',
  teamName: 'cheer-lab-team-name',
  listBannerPhoto: 'cheer-lab-list-banner-photo',
  videoPhoto: (videoId: string) => `cheer-lab-video-photo-${videoId}`,
} as const
