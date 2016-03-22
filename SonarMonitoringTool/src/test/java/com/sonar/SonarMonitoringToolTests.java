package com.sonar;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.web.WebAppConfiguration;

import alex.iamandi.SonarMonitoringTool.SonarMonitoringTool;

import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = SonarMonitoringTool.class)
@WebAppConfiguration
public class SonarMonitoringToolTests {

	@Test
	public void contextLoads() {
	}

}
