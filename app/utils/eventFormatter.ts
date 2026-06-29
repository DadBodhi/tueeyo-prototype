/**
 * Format event title according to the specified pattern:
 * - Class events: "[level] [styles] Class"
 * - Social events: "[styles] Social"
 */
export function formatEventTitle(event: any): string {
  if (!event) return '';
  
  const { event_type, level, styles } = event;
  
  // Handle social events
  if (event_type === 'social') {
    const styleNames = styles?.map((s: any) => s.style.name).join(', ') || '';
    return `${styleNames} Social`;
  }
  
  // Handle class events
  if (event_type === 'class') {
    const levelName = level?.name || '';
    const styleNames = styles?.map((s: any) => s.style.name).join(', ') || '';
    
    // If we have both level and styles, format as "[level] [styles] Class"
    // If we only have styles, format as "[styles] Class"  
    // If we only have level, format as "[level] Class"
    if (levelName && styleNames) {
      return `${levelName} ${styleNames} Class`;
    } else if (styleNames) {
      return `${styleNames} Class`;
    } else if (levelName) {
      return `${levelName} Class`;
    }
  }
  
  // Fallback to original title if no specific formatting applies
  return event.title || '';
}