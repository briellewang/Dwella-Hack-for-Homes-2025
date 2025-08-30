const responses: Record<string, string> = {
  'housing': '🏠 Based on your needs, I recommend these areas:\n\n📍 **UWA Area**: Student-friendly, great transport\n📍 **CBD**: Central location, nightlife\n📍 **Subiaco**: Quiet, family-friendly\n\nWhich area interests you most?',
  
  'rent': '💰 Perth rental price guide:\n\n🏠 **Studio**: $200-350/week\n🏠 **1 Bedroom**: $300-500/week\n🏠 **2 Bedroom**: $400-650/week\n\n💡 Budget around 30% of your income',
  
  'tips': '📋 Important rental tips:\n\n✅ Read lease agreements carefully\n✅ Bond is usually 2-4 weeks rent\n✅ Check all fixtures and fittings\n✅ Understand utility inclusions\n✅ Know pet policies\n\nAny specific questions?',
  
  'bond': '💳 Australian rental bonds:\n\n📌 **Standard bond**: 2-4 weeks rent\n📌 **Pet bond**: Extra 1-2 weeks (if pets allowed)\n📌 **Refund conditions**: No damage, clean property\n📌 **Processing time**: Usually 7-14 business days\n\nAlways keep bond receipts!',
  
  'default': 'I\'m here to help you find the perfect place! Tell me about your budget, preferred location, or any specific requirements.'
};

export const getAIResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('hous') || lowerInput.includes('place') || lowerInput.includes('area')) {
    return responses['housing'];
  } else if (lowerInput.includes('rent') || lowerInput.includes('price') || lowerInput.includes('cost')) {
    return responses['rent'];
  } else if (lowerInput.includes('tip') || lowerInput.includes('advice') || lowerInput.includes('help')) {
    return responses['tips'];
  } else if (lowerInput.includes('bond') || lowerInput.includes('deposit')) {
    return responses['bond'];
  } else {
    return responses['default'];
  }
};