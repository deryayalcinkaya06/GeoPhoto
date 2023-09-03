/**
 * This is a helper function to make it easier to add testIDs and accessibilityLabels to components.
 */
export default function testProps(id: string) {
    return {
      testID: id,
      accessibilityLabel: id,
    };
  }
  